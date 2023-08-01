## A simple sticky note
Used for fast text sharing across multiple platforms.

For CLI:
```
curl http://localhost:3000 -s | awk -v RS="<div>|</div>" 'NR==2 {gsub(/^[ \t\n]+|[ \t\n]+$/, ""); print $0}' 
```