import Mellowtel from 'mellowtel';

(async () => {
    const mellowtel = new Mellowtel('f4387458');
    await mellowtel.initContentScript();
})();