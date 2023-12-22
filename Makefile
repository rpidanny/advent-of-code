YEARS:=$(shell ls -d */ | sed 's:/$$::' | grep -E '^[0-9]{4}' | sort -u)

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
