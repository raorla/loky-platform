echo '{ "deterministic-output-path" : "/iexec_out/result.txt" }' > $IEXEC_OUT/computed.json

env | sort

echo "ollama serve"
ollama serve &
ollama_pid=$!
sleep 5s

echo '{"deterministic-output-path":"/iexec_out/result.txt"}' > /iexec_out/computed.json

echo "images"
ollama ls

echo "run"
ollama run gemma3:4b "Peux-tu analyser les données de ces différents fichiers pour un bail locatif ? $(/borsh-deser)" | tee $IEXEC_OUT/result.txt
