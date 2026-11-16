import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { celestialBodies } from '../data/cosmosData';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ZoomIn, 
  ZoomOut, 
  Info, 
  ChevronRight, 
  Sparkles,
  Compass,
  Layers,
  Thermometer,
  Weight,
  Maximize2
} from 'lucide-react';

export default function CosmosViewer({ onSelectPlanet, selectedPlanetId }) {
  const mountRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [activePlanet, setActivePlanet] = useState(celestialBodies[3]); // Earth by default
  const [showRings, setShowRings] = useState(true);
  const [viewMode, setViewMode] = useState('3D'); // '3D' or 'Factsheet'

  // Refs for 3D state
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const planetMeshesRef = useRef([]);
  const animFrameIdRef = useRef(null);
  const isPlayingRef = useRef(true);
  const speedRef = useRef(1);

  isPlayingRef.current = isPlaying;
  speedRef.current = speedMultiplier;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight || 580;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x060517);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 24, 38);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    // 4. Lighting: PointLight at center (Sun) + soft ambient light
    const sunLight = new THREE.PointLight(0xfffaed, 2.5, 120, 0.5);
    sunLight.position.set(0, 0, 0);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x2d1f4d, 0.9);
    scene.add(ambientLight);

    // 5. Starfield background particles
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1800;
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 300;
      starPositions[i + 1] = (Math.random() - 0.5) * 300;
      starPositions[i + 2] = (Math.random() - 0.5) * 300;
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xdfd9ff,
      size: 0.7,
      transparent: true,
      opacity: 0.8
    });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // 6. Build Celestial Bodies & Orbit Rings
    const meshes = [];

    celestialBodies.forEach((body) => {
      // Orbit Ring line
      if (body.orbitDistance > 0) {
        const ringGeo = new THREE.RingGeometry(body.orbitDistance - 0.04, body.orbitDistance + 0.04, 64);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x6d28d9,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.28
        });
        const orbitLine = new THREE.Mesh(ringGeo, ringMat);
        orbitLine.rotation.x = Math.PI / 2;
        scene.add(orbitLine);
      }

      // Planet Sphere
      const sphereGeo = new THREE.SphereGeometry(body.size, 32, 32);
      let sphereMat;

      if (body.id === 'sun') {
        // Glowing emissive material for the Sun
        sphereMat = new THREE.MeshBasicMaterial({ color: 0xfbbf24 });
        // Outer sun glow corona
        const glowGeo = new THREE.SphereGeometry(body.size * 1.25, 24, 24);
        const glowMat = new THREE.MeshBasicMaterial({
          color: 0xf59e0b,
          transparent: true,
          opacity: 0.25,
          side: THREE.BackSide
        });
        const glowMesh = new THREE.Mesh(glowGeo, glowMat);
        scene.add(glowMesh);
      } else {
        sphereMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color(body.color),
          roughness: 0.6,
          metalness: 0.2
        });
      }

      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.userData = { ...body, angle: Math.random() * Math.PI * 2 };
      
      // Position initially along orbit
      if (body.orbitDistance > 0) {
        mesh.position.x = Math.cos(mesh.userData.angle) * body.orbitDistance;
        mesh.position.z = Math.sin(mesh.userData.angle) * body.orbitDistance;
      }

      // Special Saturn Ring
      if (body.hasRings) {
        const saturnRingGeo = new THREE.RingGeometry(body.size * 1.4, body.size * 2.3, 32);
        const saturnRingMat = new THREE.MeshBasicMaterial({
          color: 0xd97706,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6
        });
        const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat);
        saturnRing.rotation.x = Math.PI / 2.3;
        mesh.add(saturnRing);
      }

      scene.add(mesh);
      meshes.push(mesh);
    });

    planetMeshesRef.current = meshes;

    // 7. Raycaster for clicking on celestial spheres
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleCanvasClick = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planetMeshesRef.current);

      if (intersects.length > 0) {
        const clickedData = intersects[0].object.userData;
        if (clickedData && clickedData.id) {
          setActivePlanet(clickedData);
          if (onSelectPlanet) onSelectPlanet(clickedData);
        }
      }
    };

    mount.addEventListener('click', handleCanvasClick);

    // 8. Animation Loop
    let angleDelta = 0;
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      if (isPlayingRef.current) {
        planetMeshesRef.current.forEach((mesh) => {
          const data = mesh.userData;
          // Spin on axis
          mesh.rotation.y += data.rotSpeed * speedRef.current;

          // Orbit around sun
          if (data.orbitDistance > 0) {
            data.angle += (data.orbitSpeed * 0.5) * speedRef.current;
            mesh.position.x = Math.cos(data.angle) * data.orbitDistance;
            mesh.position.z = Math.sin(data.angle) * data.orbitDistance;
          }
        });
      }

      // Gentle camera sway
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight || 580;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mount.removeEventListener('click', handleCanvasClick);
      cancelAnimationFrame(animFrameIdRef.current);
      if (renderer.domElement && mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleSelectPlanet = (planet) => {
    setActivePlanet(planet);
    if (onSelectPlanet) onSelectPlanet(planet);
  };

  return (
    <div style={{ position: 'relative', width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      {/* 3D Canvas Container */}
      <div 
        ref={mountRef} 
        style={{ 
          width: '100%', 
          height: '560px', 
          cursor: 'grab', 
          background: 'radial-gradient(circle at center, #130f3a 0%, #060517 80%)' 
        }} 
      />

      {/* Top Floating Controls Bar */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        right: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pointerEvents: 'none'
      }}>
        {/* Planet Quick Select Pills */}
        <div style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          maxWidth: '70%',
          padding: '6px 10px',
          background: 'rgba(10, 8, 32, 0.75)',
          backdropFilter: 'blur(12px)',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)',
          pointerEvents: 'auto'
        }}>
          {celestialBodies.map((body) => {
            const isSelected = activePlanet?.id === body.id;
            return (
              <button
                key={body.id}
                onClick={() => handleSelectPlanet(body)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-full)',
                  border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                  background: isSelected ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                  color: isSelected ? '#ffffff' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <span style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  background: body.color, 
                  display: 'inline-block' 
                }} />
                <span>{body.name}</span>
              </button>
            );
          })}
        </div>

        {/* Orbit Speed & Play/Pause Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(10, 8, 32, 0.75)',
          backdropFilter: 'blur(12px)',
          padding: '6px 12px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)',
          pointerEvents: 'auto'
        }}>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause Orbits' : 'Resume Orbits'}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent-lavender)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button
            onClick={() => setSpeedMultiplier(s => (s === 1 ? 2 : s === 2 ? 4 : 1))}
            style={{
              background: 'rgba(139, 92, 246, 0.2)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--accent-lavender)',
              padding: '2px 8px',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {speedMultiplier}x
          </button>
        </div>
      </div>

      {/* Bottom Planet Inspector Card */}
      {activePlanet && (
        <div style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          right: '16px',
          background: 'rgba(14, 11, 44, 0.88)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border-glow)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 20px',
          boxShadow: 'var(--glow-purple)',
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          alignItems: 'center',
          gap: '20px'
        }}>
          {/* Planet Avatar & Basic */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${activePlanet.color} 70%, #000000 100%)`,
              boxShadow: `0 0 20px ${activePlanet.color}66`,
              flexShrink: 0
            }} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{activePlanet.name}</h3>
                <span className="badge-pill badge-purple" style={{ fontSize: '0.72rem' }}>
                  {activePlanet.type}
                </span>
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {activePlanet.descriptionEn}
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div style={{ display: 'flex', gap: '20px', borderLeft: '1px solid var(--border-subtle)', paddingLeft: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-dim)', fontSize: '0.75rem' }}>
                <Thermometer size={13} color="var(--accent-cyan)" />
                <span>Surface Temp</span>
              </div>
              <p style={{ fontWeight: 700, fontSize: '0.92rem', color: '#ffffff' }}>{activePlanet.surfaceTemp}</p>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-dim)', fontSize: '0.75rem' }}>
                <Weight size={13} color="var(--accent-lavender)" />
                <span>Gravity</span>
              </div>
              <p style={{ fontWeight: 700, fontSize: '0.92rem', color: '#ffffff' }}>{activePlanet.gravity}</p>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--text-dim)', fontSize: '0.75rem' }}>
                <Compass size={13} color="var(--accent-gold)" />
                <span>Diameter</span>
              </div>
              <p style={{ fontWeight: 700, fontSize: '0.92rem', color: '#ffffff' }}>{activePlanet.diameter}</p>
            </div>
          </div>

          {/* Scientific Insight Card */}
          <div style={{
            background: 'rgba(139, 92, 246, 0.12)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 14px',
            maxWidth: '280px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700 }}>
              <Sparkles size={12} />
              <span>Scientific Discovery</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.5, marginTop: '4px' }}>
              {activePlanet.funFactEn}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
