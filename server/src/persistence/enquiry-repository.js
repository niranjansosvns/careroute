export function createEnquiryRepository(database) {
  const insertEnquiry = database.prepare(`
    INSERT INTO enquiries (name, email, phone, care_area, message, consent)
    VALUES (@name, @email, @phone, @careArea, @message, 1)
  `);

  return {
    create(enquiry) {
      const result = insertEnquiry.run(enquiry);
      return { id: Number(result.lastInsertRowid) };
    },
  };
}