const tg = window.Telegram.WebApp;

export function useTelegram() {
  const onClose = () => {
    tg.close();
  };

  const onTaggleButton = () => {
    tg.close();
  };

  const onToggleButton = () => {
    if (tg.MainButton.isVisible) {
      tg.MainButton.hide();
    }else{
        tg.MainButton.show()
    }
  };

  return {
    onClose,
    tg,
    user: tg.initDataUnSafe?.user,
  };
}
