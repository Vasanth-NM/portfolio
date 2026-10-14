@echo off
echo ========================================================
echo  Pushing latest updates to GitHub...
echo ========================================================
git push origin main
if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo  SUCCESS: Changes pushed to GitHub!
    echo  Your live GitHub page will update in 1-2 minutes.
    echo ========================================================
) else (
    echo.
    echo Push encountered an issue. Please verify your GitHub login.
)
pause
