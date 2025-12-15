FROM mcr.microsoft.com/devcontainers/base:ubuntu-22.04

# general dependencies
RUN apt-get update && \
    apt-get install -y \
    pandoc \ 
    inotify-tools \ 
    bc \ 
    time \
    golang

# javascript dependencies
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | bash - && \
    apt-get install -y \
    nodejs && \
    npm install -g eslint prettier nodemon

# typescript dependencies
RUN npm install -g typescript bun tsx

# python dependencies
RUN apt-get install -y \
    pip pylint isort && \
    pip install black pytest-watch termcolor psutil

# Create alias for 'python' to point to 'python3'
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3 1

# cleanup
RUN apt-get clean && \
    rm -rf /var/lib/apt/lists/*
