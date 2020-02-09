module.exports = (response) => {
  const { OverallStatus, Results, RequestID } = response;
  return {
    edges: Results.map((node) => ({ node })),
    pageInfo: {
      requestId: RequestID,
      hasMoreData: OverallStatus === 'MoreDataAvailable',
    },
  };
};
