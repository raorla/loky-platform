FROM ollama/ollama:0.9.3

RUN bash -c "ollama serve &" && sleep 5s && ollama pull gemma3:1b

COPY borsh-deser .

COPY entrypoint.sh .

ENTRYPOINT ["/bin/bash", "entrypoint.sh"]
