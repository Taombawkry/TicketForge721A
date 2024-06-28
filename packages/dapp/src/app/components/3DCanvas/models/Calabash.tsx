'use client';
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 public/models/Calabash.glb -t -r public 
*/

import * as THREE from 'three';
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    calabash: THREE.Mesh;
    ZBrushPolyMesh3D: THREE.Mesh;
  };
  materials: {
    wire_224198087: THREE.MeshStandardMaterial;
    POT: THREE.MeshStandardMaterial;
  };
};

type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>
>;

export function Calabash(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/models/Calabash.glb') as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.calabash.geometry}
        material={materials.wire_224198087}
        rotation={[Math.PI / 3, 0, 0]}
        scale={[0.1, 0.1, 0.1]} // Adjust the scale to make it 2 times smaller
      />
      <mesh
        geometry={nodes.ZBrushPolyMesh3D.geometry}
        material={materials.POT}
        rotation={[Math.PI / 3, 0, 0]}
        scale={[0.1, 0.1, 0.1]} // Adjust the scale to make it 2 times smaller
      />
    </group>
  );
}

useGLTF.preload('/models/Calabash.glb');
