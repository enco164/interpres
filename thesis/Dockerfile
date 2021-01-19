FROM tianon/latex
LABEL description="Latex image with pygments"
RUN apt-get update -y && \
    apt-get install -y python-pygments && \
    rm -rf /var/lib/apt/lists/*
