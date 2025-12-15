GREEN:=\033[0;32m
NC:=\033[0m
RED:=\033[0;31m

DAYS:=$(shell ls -d */ | sed 's:/$$::' | grep -E '^Day[0-9]{2}' | sort -u)


init: # Init folder for a given [day]
ifndef day
	@echo "[day] must be defined"
else ifneq ("$(wildcard Day$(day))", "")
	@echo "directory already exists"
else
	@mkdir -p Day$(day)
	@cp -r Day00/* Day$(day)
	@sed -i '' 's/Day00/Day$(day)/g' Day$(day)/main.go
	@echo "Day$(day) created! happy coding!"
endif

test: # Run tests 
ifndef day
	@echo "Running all tests for 2017"
	@for day in $(shell ls -d */); do \
		echo "----------------------------------------------------------------------"; \
    echo "$(GREEN)Running tests for $$day...$(NC)"; \
		cd $$day && go test ./solutions || exit 1; \
	done;
else
	@echo "$(GREEN)Running tests for Day$(day)...$(NC)"
	@cd Day$(day) && go test ./solutions || exit 1
endif

test-watch:  # Run tests in watch mode
ifndef day
	@echo "Running all tests for 2017"
	@for day in $(DAYS); do \
		echo "----------------------------------------------------------------------"; \
		echo "$(GREEN)Running tests for $$day...$(NC)"; \
		( \
			cd $$day && \
			find . -name '*.go' | entr -c sh -c 'echo "Running tests for $$day..."; gotestsum --format short-verbose ./solutions' \
		) & \
	done; \
	wait
else
	@echo "$(GREEN)Running tests for Day$(day)...$(NC)"; \
	( cd Day$(day) && \
		find . -name '*.go' | entr -c sh -c 'echo "Running tests for Day$(day)..."; gotestsum --format short-verbose ./solutions' )
endif

lint: # Run linter
ifndef day
	@echo "Running linter for 2017"
	@for day in $(shell ls -d */); do \
		echo "----------------------------------------------------------------------"; \
    echo "$(GREEN)Running linter for $$day...$(NC)"; \
		go fmt ./$$day || exit 1; \
	done;
else
	@echo "$(GREEN)Running linter for Day$(day)...$(NC)"
	go fmt ./Day$(day) || exit 1
endif

format: # Format code
ifndef day
	@echo "Running formatter for 2017"
	@for day in $(shell ls -d */); do \
		echo "----------------------------------------------------------------------"; \
    echo "$(GREEN)Running formatter for $$day...$(NC)"; \
		go fmt ./$$day || exit 1; \
	done;
else
	@echo "$(GREEN)Running formatter for Day$(day)...$(NC)"
	go fmt ./Day$(day) || exit 1
endif

run: # Run code
ifndef day
	@echo "Running code for 2017"
	@for day in $(DAYS); do \
		echo "----------------------------------------------------------------------"; \
		echo "$(GREEN)Running code for $$day...$(NC)"; \
		cd $$day && go run main.go || exit 1; \
	done;
else
	@echo "$(GREEN)Running code for Day$(day)...$(NC)"
	@cd Day$(day) && go run main.go || exit 1
endif

run-dev: # Run code in dev mode
ifndef day
	@echo "$(RED)Only single day can be in in dev mode$(NC)"
else
	@echo "$(GREEN)Running code for Day$(day)...$(NC)"
	@cd Day$(day) && air main.go || exit 1
endif
