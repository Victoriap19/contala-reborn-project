
FROM python:3.11-slim

# Set working directory
WORKDIR /workspace

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    git \
    curl \
    postgresql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js for frontend development
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g bun

# Set Python environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install Python dependencies
COPY backend/requirements.txt /tmp/requirements.txt
RUN pip install --upgrade pip && \
    pip install -r /tmp/requirements.txt

# Set up shell
RUN echo "alias runserver='cd /workspace/backend && python manage.py runserver 0.0.0.0:8000'" >> /root/.bashrc
RUN echo "alias makemigrations='cd /workspace/backend && python manage.py makemigrations'" >> /root/.bashrc
RUN echo "alias migrate='cd /workspace/backend && python manage.py migrate'" >> /root/.bashrc
