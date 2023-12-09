for day in "."/*; do
  if [ -d "$day" ]; then
    echo "----------------------------------------------------------------------"
    echo -e "\033[0;32mRunning tests for $day ..."
    pytest -v $day
  fi
done