module.exports = {
  /**
   *
   */
  Send: {
    id: (send) => send.ID,
    emailName: (send) => send.EmailName,
  },

  /**
   *
   */
  Query: {
    send: async (_, { input }, { mc }) => {
      const { id } = input;
      const send = await mc.retrieveOne('Send', {
        attributes: { 'xsi:type': 'SimpleFilterPart' },
        Property: 'ID',
        SimpleOperator: 'equals',
        Value: id,
      }, ['ID', 'EmailName']);
      if (!send) return null;
      return send;
    },
  },
};
