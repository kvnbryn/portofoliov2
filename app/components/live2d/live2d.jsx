import { useEffect, useRef } from 'react'
import { LIVE2D_CDNS } from './static'

const Live2d = ({ modelUrl, style }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadCDNs = async () => {
      const loadScript = (src) => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      };

      // Load all CDN scripts
      for (let i = 0; i < LIVE2D_CDNS.length; i++) {
        await loadScript(LIVE2D_CDNS[i].link);
      }
    };

    const initLive2d = async () => {
      await loadCDNs();

      const app = new PIXI.Application({
        view: canvasRef.current,
        autoStart: true,
        transparent: true,
        width: 700, // Sesuaikan ukuran canvas di sini
        height: 998, // Sesuaikan ukuran canvas di sini
      });

      const model = await PIXI.live2d.Live2DModel.from(modelUrl);
      model.scale.set(0.5); // Sesuaikan skala model di sini
      app.stage.addChild(model);

      // Tambahkan interaksi klik
      canvasRef.current.addEventListener('click', () => {
        console.log('Model clicked!');
        // Tambahkan logika tambahan untuk interaksi klik, misalnya animasi
      });
    };

    initLive2d();
  }, [modelUrl]);

  return (
    <div style={{ position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{
          ...style,
          position: 'absolute', // Supaya elemen canvas bisa diatur posisinya
          bottom: '10px', // Sesuaikan posisi
          right: '350px', // Sesuaikan posisi
          zIndex: 9999, // Supaya model muncul di atas elemen lain
        }}
      ></canvas>
    </div>
  );
};

export default Live2d;
