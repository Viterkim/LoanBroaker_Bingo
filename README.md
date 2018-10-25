# Loanbroaker description of filters(small programs made in node, running in a docker image):

## Typescript startup
npm i typescript -g
in visual code: ctrl+shift+b = tsc-watch
Before a normal build: tsc

Lona Request ->
Start of data:
Get Credit Score: Read from "Credit Bureau", which is the start of the data send to the pipe.

Get Banks: Gets banks from "Rule Base" and adds it to the data, then sends it to the pipe.

Recip. List: Reads list of banks (recipients) and pipes the data to the correct translator (via a pipe)

Translators: Reads data, digests the data into something the bank components can understand.



End of data:
Normalizer: Gets data back from banks outside the system, and combines the different data into 1 object. (XML + JSON -> 1 JSON object example)

Aggregator: Takes a combination of values and returns after a condition is met(filters out bad quotes, and returns the best one).

-> Best Quote
