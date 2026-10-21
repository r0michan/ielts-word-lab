// Attach model answers and key points to the writing prompts by title.
(window.WRITING.prompts || []).forEach(p => {
  const m = (window.WRITING_MODELS || {})[p.title];
  if (!m) return;
  if (m.model) p.model = m.model;
  if (m.points) p.points = m.points;
});
