GREEN:=\033[0;32m
NC:=\033[0m
RED:=\033[0;31m

YEARS:=$(shell ls -d */ | sed 's:/$$::' | grep -E '^[0-9]{4}' | sort -u)

GIT_HOOKS_SCRIPTS_DIR:=.githooks


init: # Init folder for a given [year] and [day]
ifndef year
	@echo "[year] must be defined"
else ifndef day
	@echo "[day] must be defined"
else ifneq ("$(wildcard $(year)/Day$(day))", "")
	@echo "directory already exists"
else
	$(MAKE) -C $(year) init day=$(day)
endif



fetch-problem: # Fetch problem description for a given [year] and [day]
ifndef year
	@echo "[year] must be defined"
else ifndef day
	@echo "[day] must be defined"
else
	@python3 scripts/get_problem.py $(year) $(day)
endif


configure-hooks: # Configure git hooks
	@echo "Installing Git hooks..."
	@if [ ! -d "$(GIT_HOOKS_SCRIPTS_DIR)" ]; then \
		echo "Error: Git hooks scripts dir not found."; \
		exit 1; \
	fi
	@for file in "$(GIT_HOOKS_SCRIPTS_DIR)"/*; do \
		file_name=$$(basename "$$file"); \
		link_path=".git/hooks/$$file_name"; \
		echo "Installing Git hook: $$file_name"; \
		cp -f "$$file" "$$link_path"; \
		chmod +x "$$link_path"; \
	done
	@echo "$(GREEN)Git hooks installed successfully.$(NC)"


test: # Run tests
ifndef year
	@echo "Running all tests for all years"
	@for year in $(YEARS); do \
		$(MAKE) -C $$year test; \
	done
else ifndef day
	@$(MAKE) -C $(year) test
else
	@echo "Running tests for $(year)/Day$(day)"
	@$(MAKE) -C $(year) test day=$(day)
endif


test-watch: # Run tests in watch mode
ifndef year
	@echo "Running all tests for all years"
	@for year in $(YEARS); do \
		$(MAKE) -C $$year test-watch; \
	done
else ifndef day
	@$(MAKE) -C $(year) test-watch
else
	@echo "Running tests for $(year)/Day$(day)"
	@+$(MAKE) -C $(year) test-watch day=$(day)
endif


lint: # Run linter
ifndef year
	@echo "Running linter for all years"
	@for year in $(YEARS); do \
		$(MAKE) -C $$year lint; \
	done
else ifndef day
	@$(MAKE) -C $(year) lint
else
	@echo "Running linter for $(year)/Day$(day)"
	@$(MAKE) -C $(year) lint day=$(day)
endif


format: # Format code
ifndef year
	@echo "Formatting all years"
	@for year in $(YEARS); do \
		$(MAKE) -C $$year format; \
	done
else ifndef day
	@$(MAKE) -C $(year) format
else
	@echo "Formatting $(year)/Day$(day)"
	@$(MAKE) -C $(year) format day=$(day)
endif


run: # Run code
ifndef year
	@echo "Running code for all years"
	@for year in $(YEARS); do \
		$(MAKE) -C $$year run; \
	done
else ifndef day
	@echo "Running code for $(year)"
	@$(MAKE) -C $(year) run
else
	@echo "Running code for $(year)/Day$(day)"
	@$(MAKE) -C $(year) run day=$(day)
endif


run-dev: # Run code in dev mode
ifndef year
	@echo "$(RED)Only single year can be in in dev mode$(NC)"
else ifndef day
	@echo "$(RED)Only single day can be in in dev mode$(NC)"
else
	@echo "Running code for $(year)/Day$(day)"
	@$(MAKE) -C $(year) run-dev day=$(day)
endif
