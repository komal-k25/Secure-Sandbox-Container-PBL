# 1. The Base: Use an image that already has a Desktop (XFCE) and a Web-VNC server
FROM accetto/ubuntu-vnc-xfce-g3:latest

# 2. Switch to 'root' to install new software
USER root

# 3. Install the Essentials (Browser and tools)
RUN apt-get update && apt-get install -y \
    curl \
    chromium-browser \
    git

# 4. Install VS Code
RUN curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg && \
    install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/ && \
    echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list && \
    apt-get update && apt-get install -y code

# 5. Security & Settings
# Set a default password for the VNC web interface
ENV VNC_PW=password123
# Use a standard resolution
ENV VNC_RESOLUTION=1280x720

# 6. Open the port that the web browser will use to show the desktop
EXPOSE 6080

# 7. Switch back to a non-admin user for safety
USER 1000