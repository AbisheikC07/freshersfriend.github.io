// Replace your findBestAnswer function with this improved version
function findBestAnswer(userText){
  const tokens = tokenize(userText);
  if(tokens.length === 0) return null;

  let bestIndex = -1;
  let bestScore = 0;

  for(let i=0;i<dataset.length;i++){
    const qTokens = tokenize(dataset[i].q);
    const aTokens = tokenize(dataset[i].a);

    // exact phrase bonus
    let score = 0;
    if(dataset[i].q.toLowerCase().includes(userText.toLowerCase())) score += 3;

    // token overlap (query tokens)
    const qSet = new Set(qTokens);
    for(const t of tokens) if(qSet.has(t)) score += 1;

    // answer overlap (lower weight)
    const aSet = new Set(aTokens);
    for(const t of tokens) if(aSet.has(t)) score += 0.6;

    // length normalization (prefer denser matches)
    score = score / Math.sqrt(qTokens.length + 1);

    if(score > bestScore){
      bestScore = score;
      bestIndex = i;
    }
  }

  // Threshold for confident match
  if(bestScore < 0.9) return null;
  return dataset[bestIndex].a;
}
