init: # Init folder for a given [day]
ifndef day
	@echo "[day] must be defined"
else ifneq ("$(wildcard Day$(day))", "")
	@echo "directory already exists"
else
	@mkdir -p Day$(day)
	@cp Day00/* Day$(day)
	@echo "Day$(day) created! good coding!"
endif

test: # Run tests 
ifndef day
	@echo "Running all tests for 2022"
	@npm run test
else
	@echo "Running tests for Day$(day)"
	@npm run test -- ./Day$(day)
endif

lint: # Run linter
ifndef day
	@echo "Running linter for 2022"
	@npm run lint
else
	@echo "Running linter for Day$(day)"
	@npm run lint -- ./Day$(day)
endif

format: # Format code
ifndef day
	@echo "Running formatter for 2022"
	@npm run lint:fix
else
	@echo "Running formatter for Day$(day)"
	@npm run lint:fix -- ./Day$(day)
endif
