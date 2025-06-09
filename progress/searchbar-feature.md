# Modular Natural Language Search Feature Progress

This file tracks all progress, decisions, and implementation notes for the new modular search feature, until it is completed and summarized in `progress.md`.

---

## High-Level Plan
1. Integrate modular query parser (OpenAI or local, easily swappable)
2. Always check Supabase cache/database first
3. If not enough results, query at least one public/free registry (Companies House, Wikidata, OpenCorporates, etc.)
4. Add modular adapters for each data source
5. Merge results from all sources
6. Cache successful results in Supabase
7. Provide Google search fallback if no results
8. Handle all third-party failures gracefully
9. Add automated tests for external data integrations
10. Add analytics for search usage and user behavior
11. Implement granular quota system (per feature, per plan)
12. Document modular architecture for easy swapping of parser or data sources

---

## Progress Tracking

### In Progress 🚧
- [ ] Integrate modular query parser (OpenAI or local)
- [ ] Supabase cache/database check
- [ ] Public registry API integration (Companies House, etc.)
- [ ] Modular data source adapters
- [ ] Result merging & caching
- [ ] Google search fallback
- [ ] Error/failure handling
- [ ] Automated tests for data integrations
- [ ] Analytics for search usage
- [ ] Granular quota system
- [ ] Documentation

### Completed ✅
- _To be filled as tasks are finished_

---

## Notes
- OpenAI API key is required for OpenAI integration, but the parser is modular and can be swapped for another provider or local parser if needed.
- All progress and implementation notes should be added here until the feature is complete.
