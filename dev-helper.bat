@echo off
REM Analytics Platform - Development Helper Script (Windows)
REM This script provides quick commands for common development tasks

:menu
cls
echo ======================================
echo   Analytics Platform - Dev Helper
echo ======================================
echo.
echo Select an option:
echo 1. Install dependencies
echo 2. Start development server
echo 3. Build for production
echo 4. Preview production build
echo 5. Clean and reinstall
echo 6. Check for updates
echo 7. Run type check
echo 8. Exit
echo.

set /p choice="Enter choice [1-8]: "

if "%choice%"=="1" goto install
if "%choice%"=="2" goto dev
if "%choice%"=="3" goto build
if "%choice%"=="4" goto preview
if "%choice%"=="5" goto clean
if "%choice%"=="6" goto updates
if "%choice%"=="7" goto typecheck
if "%choice%"=="8" goto exit
echo Invalid option. Please try again.
timeout /t 2 >nul
goto menu

:install
echo Installing dependencies...
call pnpm install
echo.
echo Dependencies installed!
pause
goto menu

:dev
echo Starting development server...
echo App will be available at http://localhost:5173
echo.
call pnpm dev
pause
goto menu

:build
echo Building for production...
call pnpm build
echo.
echo Build complete! Check the 'dist' folder.
pause
goto menu

:preview
echo Starting production preview...
call pnpm preview
pause
goto menu

:clean
echo Cleaning node_modules...
rmdir /s /q node_modules 2>nul
del pnpm-lock.yaml 2>nul
echo Reinstalling...
call pnpm install
echo.
echo Clean install complete!
pause
goto menu

:updates
echo Checking for package updates...
call pnpm outdated
echo.
pause
goto menu

:typecheck
echo Running TypeScript type check...
call npx tsc --noEmit
echo.
echo Type check complete!
pause
goto menu

:exit
echo Goodbye!
timeout /t 1 >nul
exit
