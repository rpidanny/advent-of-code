YEARS:=$(shell seq -w 2015 2035)
DAYS:=$(shell seq -w 1 25)

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
