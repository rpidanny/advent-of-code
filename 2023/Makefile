DAYS:=$(shell seq -w 1 25)

init: # Init folder for a given [day]
ifndef day
	@echo "[day] must be defined"
else ifneq ("$(wildcard Day$(day))", "")
	@echo "directory already exists"
else
	@mkdir -p Day$(day)
	@cp Day00/* Day$(day)
	@grep -rl "Day 0" Day$(day)/solutions.spec.ts | xargs sed -i "" "s/Day 0/Day $(day)/g"
	@echo "Day$(day) created! happy coding!"
endif
