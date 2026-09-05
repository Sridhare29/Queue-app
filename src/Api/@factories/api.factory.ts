const apiFactory = (apiMethods: any) => {
  return {
    base: {
      handleError({ throwTheErr }: { throwTheErr: boolean }) {
        if (throwTheErr) {
          throw new Error('An error occurred while fetching data.');
        }
        return null;
      },
    },
    ...apiMethods,
  };
};

export default apiFactory;
