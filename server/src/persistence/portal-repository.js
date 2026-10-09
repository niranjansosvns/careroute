export function createPortalRepository(portalContent) {
  return {
    getCatalog(collection, { query = '', category = '', page = 1, pageSize = 12 } = {}) {
      const catalog = portalContent.catalogs[collection];
      if (!catalog) return null;

      const normalizedQuery = query.trim().toLocaleLowerCase();
      const filteredItems = catalog.items.filter((item) => {
        const matchesQuery = !normalizedQuery || [
          item.title,
          item.summary,
          item.category,
          item.location ?? '',
          ...item.highlights,
        ].join(' ').toLocaleLowerCase().includes(normalizedQuery);
        const matchesCategory = !category || item.category === category;
        return matchesQuery && matchesCategory;
      });
      const start = (page - 1) * pageSize;

      return {
        collection,
        label: catalog.label,
        description: catalog.description,
        categories: [...new Set(catalog.items.map((item) => item.category))],
        items: filteredItems.slice(start, start + pageSize),
        total: filteredItems.length,
        page,
        pageSize,
      };
    },

    getCatalogItem(collection, slug) {
      const catalog = portalContent.catalogs[collection];
      const item = catalog?.items.find((record) => record.slug === slug);
      if (!catalog || !item) return null;
      return { collection, label: catalog.label, description: catalog.description, item };
    },

    getPage(slug) {
      return portalContent.pages[slug] ?? null;
    },

    search(query, collection = '') {
      const normalizedQuery = query.trim().toLocaleLowerCase();
      if (!normalizedQuery) return { query, results: [], total: 0 };

      const catalogs = collection
        ? [[collection, portalContent.catalogs[collection]]]
        : Object.entries(portalContent.catalogs);
      const results = catalogs.flatMap(([collectionName, catalog]) => {
        if (!catalog) return [];
        return catalog.items
          .filter((item) => [item.title, item.summary, item.category, item.location ?? '', ...item.highlights]
            .join(' ').toLocaleLowerCase().includes(normalizedQuery))
          .map((item) => ({
            collection: collectionName,
            label: catalog.label,
            description: catalog.description,
            item,
          }));
      });
      return { query, results, total: results.length };
    },
  };
}