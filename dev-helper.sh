#!/bin/bash

# Analytics Platform - Development Helper Script
# This script provides quick commands for common development tasks

echo "======================================"
echo "  Analytics Platform - Dev Helper"
echo "======================================"
echo ""

# Function to display menu
show_menu() {
    echo "Select an option:"
    echo "1) Install dependencies"
    echo "2) Start development server"
    echo "3) Build for production"
    echo "4) Preview production build"
    echo "5) Clean and reinstall"
    echo "6) Check for updates"
    echo "7) Run type check"
    echo "8) Exit"
    echo ""
    read -p "Enter choice [1-8]: " choice
}

# Function to install dependencies
install_deps() {
    echo "Installing dependencies..."
    pnpm install
    echo "✓ Dependencies installed!"
}

# Function to start dev server
start_dev() {
    echo "Starting development server..."
    echo "App will be available at http://localhost:5173"
    pnpm dev
}

# Function to build
build_app() {
    echo "Building for production..."
    pnpm build
    echo "✓ Build complete! Check the 'dist' folder."
}

# Function to preview
preview_app() {
    echo "Starting production preview..."
    pnpm preview
}

# Function to clean and reinstall
clean_install() {
    echo "Cleaning node_modules..."
    rm -rf node_modules pnpm-lock.yaml
    echo "Reinstalling..."
    pnpm install
    echo "✓ Clean install complete!"
}

# Function to check updates
check_updates() {
    echo "Checking for package updates..."
    pnpm outdated
}

# Function to type check
type_check() {
    echo "Running TypeScript type check..."
    npx tsc --noEmit
    echo "✓ Type check complete!"
}

# Main loop
while true; do
    show_menu
    case $choice in
        1)
            install_deps
            echo ""
            ;;
        2)
            start_dev
            echo ""
            ;;
        3)
            build_app
            echo ""
            ;;
        4)
            preview_app
            echo ""
            ;;
        5)
            clean_install
            echo ""
            ;;
        6)
            check_updates
            echo ""
            ;;
        7)
            type_check
            echo ""
            ;;
        8)
            echo "Goodbye!"
            exit 0
            ;;
        *)
            echo "Invalid option. Please try again."
            echo ""
            ;;
    esac
    
    read -p "Press Enter to continue..."
    clear
done
