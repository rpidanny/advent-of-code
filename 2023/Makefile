GREEN:=\033[0;32m
NC:=\033[0m
RED:=\033[0;31m

DAYS:=$(shell ls -d */ | sed 's:/$$::' | grep -E '^Day[0-9]{2}' | sort -u)

OS := $(shell uname)

ifeq ($(OS),Darwin)
SED := sed -i "" 
else
SED := sed -i
endif

init: # Init folder for a given [day]
ifndef day
	@echo "[day] must be defined"
else ifneq ("$(wildcard Day$(day))", "")
	@echo "directory already exists"
else
	@mkdir -p Day$(day)
	@cp Day00/* Day$(day)
	@@grep -rl "Day 0" Day$(day)/solutions.spec.ts | xargs $(SED) 's/Day 0/Day $(day)/g'
	@echo "Day$(day) created! happy coding!"
endif

test: # Run tests 
ifndef day
	@echo "Running all tests for 2023"
	@npm run test
else
	@echo "Running tests for Day$(day)"
	@npm run test -- ./Day$(day)
endif


lint: # Run linter
ifndef day
	@echo "Running linter for 2023"
	@npm run lint
else
	@echo "Running linter for Day$(day)"
	@npm run lint -- ./Day$(day)
endif

format: # Format code
ifndef day
	@echo "Running formatter for 2023"
	@npm run lint:fix
else
	@echo "Running formatter for Day$(day)"
	@npm run lint:fix -- ./Day$(day)
endif

run: # Run code
ifndef day
	@echo "Running code for 2023"
	@for day in $(DAYS); do \
		echo "----------------------------------------------------------------------"; \
		echo "$(GREEN)Running code for $$day...$(NC)"; \
		ts-node $$day/index.ts; \
	done;
else
	@echo "Running code for Day$(day)"
	@ts-node ./Day$(day)/index.ts
endif

run-dev: # Run code in dev mode
ifndef day
	@echo "$(RED)Only single day can be in in dev mode$(NC)"
else
	@echo "Running code for Day$(day)"
	@nodemon ./Day$(day)/index.ts
endif
