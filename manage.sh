#!/bin/bash

# ==========================================
# CSS Computer Education — Project Manager
# React 19 (Vite) + Express 5 + Prisma + PostgreSQL
# ==========================================

# Configuration
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLIENT_DIR="$PROJECT_DIR/client"
SERVER_DIR="$PROJECT_DIR/server"
SERVER_PID_FILE="$SERVER_DIR/.server.pid"
CLIENT_PID_FILE="$CLIENT_DIR/.client.pid"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Load environment variables if .env exists
if [ -f "$SERVER_DIR/.env" ]; then
    export $(grep -v '^#' "$SERVER_DIR/.env" | xargs)
fi

# Ports
SERVER_PORT=${PORT:-3001}
CLIENT_PORT=${CLIENT_PORT:-5173}

function echo_info()  { echo -e "${GREEN}[INFO]${NC} $1"; }
function echo_error() { echo -e "${RED}[ERROR]${NC} $1"; }
function echo_warn()  { echo -e "${YELLOW}[WARN]${NC} $1"; }
function echo_step()  { echo -e "${CYAN}==>${NC} ${BLUE}$1${NC}"; }

function check_port() {
    local port=$1
    if command -v lsof &> /dev/null; then
        if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
            return 0 # Port is in use
        fi
    elif command -v netstat &> /dev/null; then
        if netstat -tuln | grep -q ":$port " ; then
            return 0
        fi
    fi
    return 1 # Port is free
}

function free_port() {
    local port=$1
    if check_port $port; then
        echo_warn "Port $port is in use. Attempting to free it..."
        if command -v lsof &> /dev/null; then
            local pid=$(lsof -Pi :$port -sTCP:LISTEN -t)
            if [ ! -z "$pid" ]; then
                kill -9 $pid 2>/dev/null || sudo kill -9 $pid 2>/dev/null
                echo_info "Killed process $pid on port $port."
            fi
        elif command -v fuser &> /dev/null; then
            fuser -k -n tcp $port 2>/dev/null || sudo fuser -k -n tcp $port 2>/dev/null
            echo_info "Killed process on port $port using fuser."
        fi
        sleep 1
    fi
}

# ─── Dependencies ───

function install_dependencies() {
    echo_step "Checking System Dependencies"

    if ! command -v node &> /dev/null; then
        echo_error "Node.js is not installed. Install Node 18+ from https://nodejs.org"
        exit 1
    fi
    if ! command -v npm &> /dev/null; then
        echo_error "npm not found. Install Node.js which ships npm."
        exit 1
    fi

    echo_step "Installing Client Dependencies"
    cd "$CLIENT_DIR" || exit 1
    npm install

    echo_step "Installing Server Dependencies"
    cd "$SERVER_DIR" || exit 1
    npm install

    echo_info "All dependencies installed."
}

# ─── Database ───

function db_setup() {
    echo_step "Setting Up PostgreSQL Database"

    if [ ! -f "$SERVER_DIR/.env" ]; then
        echo_warn "No .env found in server/. Copying from .env.example..."
        cp "$SERVER_DIR/.env.example" "$SERVER_DIR/.env"
        echo_info "Created server/.env — edit DATABASE_URL if needed."
    fi

    # Source the .env
    export $(grep -v '^#' "$SERVER_DIR/.env" | xargs)

    # Check if psql is available
    if command -v psql &> /dev/null; then
        local db_name=$(echo "$DATABASE_URL" | sed -E 's|.*/(.*)\??.*|\1|')
        echo_info "Ensuring database '$db_name' exists..."
        psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$db_name'" 2>/dev/null | grep -q 1 || \
            psql -U postgres -c "CREATE DATABASE $db_name" 2>/dev/null
    else
        echo_warn "psql not found — make sure the database exists before continuing."
    fi

    echo_step "Running Prisma DB Push"
    cd "$SERVER_DIR" || exit 1
    npx prisma generate
    npx prisma db push
    echo_info "Database schema synced."
}

# ─── Build ───

function build() {
    install_dependencies

    echo_step "Generating Prisma Client"
    cd "$SERVER_DIR" || exit 1
    npx prisma generate

    echo_step "Type-checking Frontend"
    cd "$CLIENT_DIR" || exit 1
    npm run typecheck || echo_warn "Frontend type errors found."

    echo_step "Building Client (Vite)"
    if ! npm run build; then
        echo_error "Client build failed."
        exit 1
    fi
    echo_info "Client built → client/dist/"

    echo_step "Type-checking Backend"
    cd "$SERVER_DIR" || exit 1
    npm run typecheck || echo_warn "Backend type errors found."

    echo_step "Building Backend (TypeScript)"
    if ! npm run build; then
        echo_error "Backend build failed."
        exit 1
    fi
    echo_info "Backend built → server/dist/"

    echo_info "Build complete."
}

# ─── Start / Stop ───

function start_server() {
    echo_step "Starting Server (Express + PostgreSQL)"

    if [ -f "$SERVER_PID_FILE" ] && kill -0 $(cat "$SERVER_PID_FILE") 2>/dev/null; then
        echo_warn "Server is already running (PID: $(cat "$SERVER_PID_FILE"))."
        return
    fi

    if check_port $SERVER_PORT; then
        echo_error "Port $SERVER_PORT is already in use."
        echo_error "Run './manage.sh stop' or free the port first."
        exit 1
    fi

    cd "$SERVER_DIR" || exit 1

    if [ ! -f ".env" ]; then
        echo_error "No .env file. Run './manage.sh db-setup' first."
        exit 1
    fi

    PORT=$SERVER_PORT nohup npx tsx src/index.ts > server.log 2>&1 &
    local PID=$!
    echo $PID > "$SERVER_PID_FILE"
    echo_info "Server started on port $SERVER_PORT (PID: $PID)."
    echo_info "Logs: server/server.log"
}

function start_client() {
    echo_step "Starting Client (Vite dev server)"

    if [ -f "$CLIENT_PID_FILE" ] && kill -0 $(cat "$CLIENT_PID_FILE") 2>/dev/null; then
        echo_warn "Client is already running (PID: $(cat "$CLIENT_PID_FILE"))."
        return
    fi

    if check_port $CLIENT_PORT; then
        echo_error "Port $CLIENT_PORT is already in use."
        echo_error "Run './manage.sh stop' or free the port first."
        exit 1
    fi

    cd "$CLIENT_DIR" || exit 1

    nohup npm run dev -- --host --port "$CLIENT_PORT" > client.log 2>&1 &
    local PID=$!
    echo $PID > "$CLIENT_PID_FILE"
    echo_info "Client started on port $CLIENT_PORT (PID: $PID)."
    echo_info "Logs: client/client.log"
}

function start_all() {
    start_server
    sleep 2
    start_client
    echo ""
    echo_step "All services started successfully!"
    echo_info "Client (dev):  http://localhost:$CLIENT_PORT"
    echo_info "Server (API):  http://localhost:$SERVER_PORT"
}

function stop_server() {
    echo_step "Stopping Server"
    if [ -f "$SERVER_PID_FILE" ]; then
        local PID=$(cat "$SERVER_PID_FILE")
        if kill -0 $PID 2>/dev/null; then
            echo_info "Stopping server (PID: $PID)..."
            kill $PID 2>/dev/null
            sleep 1
            kill -9 $PID 2>/dev/null || true
            echo_info "Server stopped."
        fi
        rm -f "$SERVER_PID_FILE"
    else
        local PID=$(pgrep -f "tsx src/index.ts" 2>/dev/null | head -1)
        if [ ! -z "$PID" ]; then
            echo_info "Found server process without PID file. Stopping..."
            kill $PID 2>/dev/null || kill -9 $PID 2>/dev/null
        fi
    fi
    free_port $SERVER_PORT
}

function stop_client() {
    echo_step "Stopping Client"
    if [ -f "$CLIENT_PID_FILE" ]; then
        local PID=$(cat "$CLIENT_PID_FILE")
        if kill -0 $PID 2>/dev/null; then
            echo_info "Stopping client (PID: $PID)..."
            pkill -P $PID 2>/dev/null || true
            kill $PID 2>/dev/null || kill -9 $PID 2>/dev/null
            echo_info "Client stopped."
        fi
        rm -f "$CLIENT_PID_FILE"
    else
        local PID=$(pgrep -f "vite" 2>/dev/null | head -1)
        if [ ! -z "$PID" ]; then
            echo_info "Found client vite process. Stopping..."
            kill $PID 2>/dev/null || kill -9 $PID 2>/dev/null
        fi
    fi
    free_port $CLIENT_PORT
}

function stop() {
    stop_server
    stop_client
}

function restart() { stop; sleep 2; start_all; }

# ─── Dev mode (foreground) ───

function dev() {
    echo_step "Starting dev mode (server + client, foreground)"
    echo_info "Starting server on port $SERVER_PORT ..."

    cd "$SERVER_DIR" || exit 1
    PORT=$SERVER_PORT npx tsx watch src/index.ts &
    local SERVER_PID=$!

    sleep 1
    echo_info "Starting client on port $CLIENT_PORT ..."

    cd "$CLIENT_DIR" || exit 1
    npm run dev -- --host --port "$CLIENT_PORT" &
    local CLIENT_PID=$!

    echo ""
    echo_info "Dev mode running. Press Ctrl+C to stop both."
    echo_info "Client: http://localhost:$CLIENT_PORT"
    echo_info "Server: http://localhost:$SERVER_PORT"

    trap "kill $SERVER_PID $CLIENT_PID 2>/dev/null; exit 0" INT TERM
    wait
}

# ─── Serve (production preview) ───

function serve() {
    build
    echo_step "Serving production build"
    cd "$SERVER_DIR" || exit 1
    PORT=$SERVER_PORT node dist/index.js
}

# ─── Status ───

function status() {
    echo_step "Service Status"

    # Server
    if [ -f "$SERVER_PID_FILE" ] && kill -0 $(cat "$SERVER_PID_FILE") 2>/dev/null; then
        echo_info "Server:  RUNNING (PID: $(cat "$SERVER_PID_FILE"), Port: $SERVER_PORT)"
    elif pgrep -f "tsx src/index.ts" >/dev/null 2>&1; then
        echo_warn "Server:  RUNNING (PID file missing)"
    else
        echo_info "Server:  STOPPED"
    fi

    # Client
    if [ -f "$CLIENT_PID_FILE" ] && kill -0 $(cat "$CLIENT_PID_FILE") 2>/dev/null; then
        echo_info "Client:  RUNNING (PID: $(cat "$CLIENT_PID_FILE"), Port: $CLIENT_PORT)"
    elif pgrep -f "vite" >/dev/null 2>&1; then
        echo_warn "Client:  RUNNING (PID file missing)"
    else
        echo_info "Client:  STOPPED"
    fi
}

# ─── Logs ───

function show_logs() {
    echo_step "Tailing Logs (Press Ctrl+C to stop)"

    local log_files=()
    [ -f "$SERVER_DIR/server.log" ] && log_files+=("$SERVER_DIR/server.log")
    [ -f "$CLIENT_DIR/client.log" ] && log_files+=("$CLIENT_DIR/client.log")

    if [ ${#log_files[@]} -eq 0 ]; then
        echo_error "No log files found."
        return
    fi

    tail -f "${log_files[@]}"
}

# ─── Clean ───

function clean() {
    echo_step "Cleaning Project Files"
    echo_info "Removing node_modules, dist, and logs..."
    rm -rf "$CLIENT_DIR/node_modules" "$CLIENT_DIR/dist"
    rm -rf "$SERVER_DIR/node_modules" "$SERVER_DIR/dist"
    rm -f "$CLIENT_DIR/client.log" "$SERVER_DIR/server.log"
    rm -f "$SERVER_PID_FILE" "$CLIENT_PID_FILE"
    echo_info "Clean complete."
}

# ─── Git helpers ───

function pull() {
    echo_step "Git Pull"
    cd "$PROJECT_DIR" || exit 1
    local branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
    if [ -n "$branch" ]; then
        git pull origin "$branch" && echo_info "Pulled from $branch" || echo_error "Pull failed"
    else
        echo_error "Not a git repo."
    fi
}

function push() {
    echo_step "Git Push"
    cd "$PROJECT_DIR" || exit 1
    read -p "Commit message (default 'Update'): " msg
    msg=${msg:-"Update"}
    git add .
    git commit -m "$msg"
    local branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
    if [ -n "$branch" ]; then
        git push origin "$branch" && echo_info "Pushed to $branch" || echo_error "Push failed"
    else
        echo_error "Not a git repo or no commits."
    fi
}

# ─── Help ───

function show_help() {
    echo -e "${YELLOW}Usage: ./manage.sh [command]${NC}"
    echo ""
    echo "Commands:"
    echo "  install        - Install npm dependencies for client & server"
    echo "  db-setup       - Create .env, database and tables"
    echo "  build          - Install deps & build client for production"
    echo "  dev            - Start client + server in dev mode (foreground)"
    echo "  serve          - Build & serve production (foreground)"
    echo "  start          - Start server only (background)"
    echo "  start-client   - Start client dev server only (background)"
    echo "  start-all      - Start server + client (background)"
    echo "  stop           - Stop all running services"
    echo "  stop-server    - Stop the server only"
    echo "  stop-client    - Stop the client only"
    echo "  restart        - Stop and restart all services"
    echo "  status         - Show status of services"
    echo "  clean          - Remove build artifacts, node_modules, and logs"
    echo "  logs           - Tail server and client logs simultaneously"
    echo "  pull           - Quick git pull"
    echo "  push           - Quick git add, commit, and push"
    echo "  help           - Show this help message"
}

# ─── Interactive menu ───

function interactive_menu() {
    while true; do
        echo ""
        echo -e "${YELLOW}═══════════════════════════════════════${NC}"
        echo -e "${YELLOW}  CSS Computer Education — Manager     ${NC}"
        echo -e "${YELLOW}═══════════════════════════════════════${NC}"
        echo ""
        echo "  1) Install dependencies"
        echo "  2) Setup database (PostgreSQL)"
        echo "  3) Build everything"
        echo "  4) Dev mode (foreground)"
        echo "  5) Serve production build"
        echo "  ─── Background services ───"
        echo "  6) Start Server only"
        echo "  7) Start Client only"
        echo "  8) Start ALL services"
        echo "  9) Stop Server only"
        echo " 10) Stop Client only"
        echo " 11) Stop ALL services"
        echo " 12) Restart ALL services"
        echo " 13) Show Status"
        echo " 14) View Logs"
        echo "  ─── Maintenance ───"
        echo " 15) Clean project"
        echo " 16) Pull from Git"
        echo " 17) Push to Git"
        echo "  0) Exit"
        echo ""
        read -p "Select an option [0-17]: " OPTION
        echo ""

        case $OPTION in
            1)  install_dependencies ;;
            2)  db_setup ;;
            3)  build ;;
            4)  dev ;;
            5)  serve ;;
            6)  start_server ;;
            7)  start_client ;;
            8)  start_all ;;
            9)  stop_server ;;
            10) stop_client ;;
            11) stop ;;
            12) restart ;;
            13) status ;;
            14) show_logs ;;
            15) clean ;;
            16) pull ;;
            17) push ;;
            0)  echo_info "Exiting..."; break ;;
            *)  echo_error "Invalid option." ;;
        esac
    done
}

# ─── Entry point ───

if [ $# -eq 0 ]; then
    interactive_menu
else
    case "$1" in
        install)        install_dependencies ;;
        db-setup)       db_setup ;;
        build)          build ;;
        dev)            dev ;;
        serve)          serve ;;
        start)          start_server ;;
        start-client)   start_client ;;
        start-all)      start_all ;;
        stop)           stop ;;
        stop-server)    stop_server ;;
        stop-client)    stop_client ;;
        restart)        restart ;;
        status)         status ;;
        clean)          clean ;;
        logs)           show_logs ;;
        pull)           pull ;;
        push)           push ;;
        help|--help|-h) show_help ;;
        *)              show_help; exit 1 ;;
    esac
fi
