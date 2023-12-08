watchman-wait . --max-events 0 -p '**/*.go' | while read line; do
  echo "File changed: $line"
  go test *.go
done