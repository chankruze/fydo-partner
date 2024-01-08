export const goBackHandler = navigation => {
  if (navigation.canGoBack()) {
    navigation.goBack();
  } else {
    navigation.reset({
      index: 0,
      routes: [{name: 'Main'}],
    });
  }
  return true;
};
