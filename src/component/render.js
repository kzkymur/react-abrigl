import AbriGL from 'abrigl';
import vs from './render.vs';
import fs from './render.fs';
import sample from '@/media/sample.png';

export default async (gl, fps) => {
  const abrigl = new AbriGL(gl);
  const m = abrigl.m;

  // init で shaderManager, canvasManager インスタンスを取得
  const shaderM = abrigl.ShaderManager.init(vs, fs); // 引数は各シェーダーのテキスト
  const canvasM = abrigl.CanvasManager.init();

  canvasM.gl.enable(canvasM.gl.DEPTH_TEST);
  canvasM.gl.depthFunc(canvasM.gl.LEQUAL);

  const sphere = abrigl.Sphere.init(shaderM, 64, [1,1,1,1]); // 第一引数はshaderM

  const imgTex = await abrigl.ImgTexture.init(sample);

  sphere.setTexture(0, imgTex.t);
  sphere.setUniform('texture', 0);

  let mMatrix = m.translate(m.identity(), [0.0, 0.0, 0.0]);
  const rendering = () => {
    canvasM.gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    const pMatrix = m.perspective(90, gl.canvas.width / gl.canvas.height, 0.1, 100);
    const vMatrix = m.lookAt([0.0, 0.0, 3.0], [0, 0, 0], [0, 1, 0]);
    shaderM.setUniform('tmpMatrix', m.multiply(pMatrix, vMatrix));
    mMatrix = m.rotate(mMatrix, 1/200, [0, 1, 0]);
    canvasM.setFrameBuffer(null, ()=>{
      canvasM.switchShader(shaderM, (s)=>{
        s.clear([0.0, 0.0, 0.0, 1.0]);
        sphere.setUniform('mMatrix', mMatrix);
        s.setAttribute(sphere, ()=>{
          s.drawElement(s.gl.TRIANGLES);
        });
      })
    })
  }
  setInterval(rendering, 1000 / fps);
};
