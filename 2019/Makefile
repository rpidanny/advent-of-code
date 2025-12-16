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
	@cp Day00/* Day$(day)
	@echo "Day$(day) created! happy coding!"
endif

test: # Run tests 
ifndef day
	@echo "Running all tests for 2019"
	@for day in $(shell ls -d */); do \
		echo "----------------------------------------------------------------------"; \
    echo "$(GREEN)Running tests for $$day...$(NC)"; \
		pytest -v $$day || exit 1; \
	done;
else
	@echo "$(GREEN)Running tests for Day$(day)...$(NC)"
	@pytest -v Day$(day) || exit 1
endif

test-watch: # Run tests in watch mode
ifndef day
	@echo "Running all tests for 2025"
	@ptw -- -vs
else
	@echo "$(GREEN)Running tests for Day$(day)...$(NC)"
	@ptw Day$(day) -- -vs
endif


lint: # Run linter
ifndef day
	@echo "Running linter for 2019"
	@black --check .
	@isort --check-only .
else
	@echo "$(GREEN)Running linter for Day$(day)...$(NC)"
	@black --check ./Day$(day)
	@isort --check-only ./Day$(day)
endif

format: # Format code
ifndef day
	@echo "Running formatter for 2019"
	@black .
	@isort .
else
	@echo "$(GREEN)Running formatter for Day$(day)...$(NC)"
	@black ./Day$(day)
	@isort ./Day$(day)
endif

run: # Run code
ifndef day
	@echo "Running code for 2019"
	@for day in $(DAYS); do \
		echo "----------------------------------------------------------------------"; \
		echo "$(GREEN)Running code for $$day...$(NC)"; \
		python3 $$day/main.py || exit 1; \
	done;
else
	@echo "$(GREEN)Running code for Day$(day)...$(NC)"
	@python3 Day$(day)/main.py || exit 1
endif

run-dev: # Run code in dev mode
ifndef day
	@echo "$(RED)Only single day can be in in dev mode$(NC)"
else
	@echo "$(GREEN)Running code for Day$(day)...$(NC)"
	@nodemon Day$(day)/main.py || exit 1
endif
