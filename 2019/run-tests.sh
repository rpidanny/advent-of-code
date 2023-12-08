for day in "."/*; do
  if [ -d "$day" ]; then
    echo "----------------------------------------------------------------------"
    echo -e "\033[0;32mRunning tests for $day ..."
    cd "$day" || exit
    # python -m unittest tests.py
    pytest
    cd ../ || exit
  fi
done