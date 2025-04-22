import Airtable from 'airtable';

const base = new Airtable({
  apiKey: import.meta.env.PUBLIC_AIRTABLE_API_KEY
}).base(import.meta.env.PUBLIC_AIRTABLE_BASE_ID);

export async function getAirtableData() {
  try {
    const records = await base(import.meta.env.PUBLIC_AIRTABLE_TABLE_NAME)
      .select({
        maxRecords: 100,
        sort: [{ field: 'createdTime', direction: 'desc' }]
      })
      .all();

    return records.map(record => ({
      id: record.id,
      createdTime: record.createdTime,
      fields: {
        client_name: record.get('client_name') as string,
        message: record.get('message') as string,
        channel: record.get('channel') as string,
        category: record.get('category') as string,
      }
    }));
  } catch (error) {
    console.error('Error fetching Airtable data:', error);
    return [];
  }
}

export async function getStatistics() {
  try {
    const records = await getAirtableData();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const thisWeek = new Date(now.setDate(now.getDate() - 7));
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return {
      total: records.length,
      today: records.filter(r => new Date(r.createdTime) >= today).length,
      thisWeek: records.filter(r => new Date(r.createdTime) >= thisWeek).length,
      thisMonth: records.filter(r => new Date(r.createdTime) >= thisMonth).length,
      byChannel: records.reduce((acc, record) => {
        const channel = record.fields.channel;
        acc[channel] = (acc[channel] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      byCategory: records.reduce((acc, record) => {
        const category = record.fields.category;
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    };
  } catch (error) {
    console.error('Error calculating statistics:', error);
    return {
      total: 0,
      today: 0,
      thisWeek: 0,
      thisMonth: 0,
      byChannel: {},
      byCategory: {}
    };
  }
}