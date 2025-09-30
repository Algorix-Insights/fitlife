// components/encuesta/EncuestaLayout.tsx
"use client";

interface EncuestaLayoutProps {
  children: React.ReactNode;
  pasoActual: number;
  totalPasos: number;
}

export default function EncuestaLayout({
  children,
  pasoActual,
  totalPasos,
}: EncuestaLayoutProps) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px',
      boxSizing: 'border-box',
      zIndex: 9999
    }}>
      <div style={{
        backgroundColor: '#eeeeff',
        padding: '48px',
        borderRadius: '20px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        width: '600px',
        maxWidth: '90vw',
        position: 'relative'
      }}>
        {/* Stepper */}
        {pasoActual > 0 && (
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '14px', fontWeight: '500', color: 'black' }}>
                Paso {pasoActual} de {totalPasos}
              </span>
              <span style={{ fontSize: '14px', fontWeight: '500', color: 'black' }}>
                {Math.round((pasoActual / totalPasos) * 100)}%
              </span>
            </div>
            <div style={{ width: '100%', backgroundColor: '#a5a7fc', borderRadius: '9999px', height: '8px' }}>
              <div
                style={{ 
                  backgroundColor: '#3032a3', 
                  height: '8px', 
                  borderRadius: '9999px', 
                  transition: 'all 0.3s',
                  width: `${(pasoActual / totalPasos) * 100}%`
                }}
              ></div>
            </div>
          </div>
        )}

        {/* Contenido */}
        <div>{children}</div>
      </div>
    </div>
  );
}
