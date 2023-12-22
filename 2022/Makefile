DAYS:=$(shell seq -w 1 25)

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
