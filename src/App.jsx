import { useState } from 'react'
import { Heart } from 'lucide-react'

import group from '../group.jpeg'
import mh from '../m h.jpeg'
import mt from '../m t.jpeg'
import solo from '../solo.jpeg'
import solo2 from '../solo2.jpeg'
import solo3 from '../solo3.jpeg'
import trio from '../trio.jpeg'
import trio2 from '../trio2.jpeg'
import soloFront from '../solo front.jpeg'
import soloBack from '../solo back.jpeg'

export default function MothersDayWebsite() {
  return (
    <div style={styles.app}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulseGlow {
          0%,100% { box-shadow: 0 0 20px rgba(255,105,180,0.4); }
          50% { box-shadow: 0 0 40px rgba(255,105,180,0.8); }
        }

        .fade-in {
          animation: fadeIn 1s ease forwards;
        }

        .floating {
          animation: float 3s ease-in-out infinite;
        }

        .glow {
          animation: pulseGlow 2s infinite;
        }

        button:hover {
          transform: scale(1.08);
        }
      `}</style>

      <MainApp />
    </div>
  )
}

function MainApp() {
  const [page, setPage] = useState('home')
  const [popped, setPopped] = useState([])
  const [visiblePhotos, setVisiblePhotos] = useState([])

  const balloons = [
    {
      id: 1,
      color: '#ff69b4',
      text: 'My Strength ❤️',
      left: '5%',
      top: '10%',
      image: solo
    },
    {
      id: 2,
      color: '#c084fc',
      text: 'Pure Love 🌸',
      left: '30%',
      top: '0%',
      image: group
    },
    {
      id: 3,
      color: '#fb7185',
      text: 'My Happiness ✨',
      left: '10%',
      top: '25%',
      image: trio
    },
    {
      id: 4,
      color: '#e879f9',
      text: 'My World 💖',
      left: '35%',
      top: '20%',
      image: solo2
    },
    {
      id: 5,
      color: '#f472b6',
      text: 'Forever Smile 🌷',
      left: '0%',
      top: '15%',
      image: mh
    },
    {
      id: 6,
      color: '#a855f7',
      text: 'My Hero ❤️',
      left: '25%',
      top: '30%',
      image: solo3
    },
    {
      id: 7,
      color: '#f43f5e',
      text: 'Endless Care 🌸',
      left: '15%',
      top: '5%',
      image: trio2
    },
    {
      id: 8,
      color: '#ec4899',
      text: 'My Home ✨',
      left: '40%',
      top: '18%',
      image: mt
    }
  ]

  const handlePop = (id) => {
    if (!popped.includes(id)) {
      const updated = [...popped, id]
      setPopped(updated)

      setVisiblePhotos((prev) => [...prev, id])

      setTimeout(() => {
        setVisiblePhotos((prev) =>
          prev.filter((photoId) => photoId !== id)
        )
      }, 3000)

      if (updated.length === balloons.length) {
        setTimeout(() => {
          setPage('final')
        }, 6000)
      }
    }
  }

  return (
    <>
      {page === 'home' && (
        <HomePage onStart={() => setPage('balloons')} />
      )}

      {page === 'balloons' && (
        <BalloonPage
          balloons={balloons}
          popped={popped}
          visiblePhotos={visiblePhotos}
          onPop={handlePop}
        />
      )}

      {page === 'final' && <FinalPage />}
    </>
  )
}

function HomePage({ onStart }) {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.card} className="fade-in">
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img
            src={soloFront}
            alt="Mom"
            className="floating"
            style={styles.mainImage}
          />

          <div style={styles.heartIcon} className="glow">
            <Heart size={28} fill="white" color="white" />
          </div>
        </div>

        <h1 style={styles.title}>
          Happy Mother's Day Amma ❤️
        </h1>

        <div style={styles.miniHeartsRow}>
          ❤️ 🌸 ✨ 💖 🌷
        </div>

        {/* <p style={styles.quote}>
          A mother is someone who gives unconditional love,
          endless support and happiness every single day.
        </p> */}

        <button
          onClick={onStart}
          style={styles.button}
          className="glow"
        >
          Click Me ✨
        </button>
      </div>
    </div>
  )
}

function BalloonPage({
  balloons,
  popped,
  visiblePhotos,
  onPop
}) {
  return (
    <div style={styles.pageContainer}>
      <div style={{ textAlign: 'center', width: '100%' }}>
        <h1 style={styles.title}>Pop the Balloons 🎈</h1>

        <p style={styles.quote}>
          Each balloon hides a beautiful memory ❤️
        </p>

        <div style={styles.balloonGrid}>
          {balloons.map((balloon, index) => {
            const isPopped = popped.includes(balloon.id)

            return (
              <div
                key={balloon.id}
                style={{
                  position: 'relative',
                  left: balloon.left,
                  top: balloon.top
                }}
              >
                {!isPopped ? (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <button
                      onClick={() => onPop(balloon.id)}
                      className="floating"
                      style={{
                        ...styles.balloon,
                        backgroundColor: balloon.color,
                        animationDelay: `${index * 0.3}s`
                      }}
                    />

                    <div style={styles.string}></div>
                  </div>
                ) : visiblePhotos.includes(balloon.id) ? (
                  <div style={styles.photoCard} className="fade-in">
                    <img
                      src={balloon.image}
                      alt="Memory"
                      style={styles.memoryImage}
                    />

                    <p style={styles.memoryText}>
                      {balloon.text}
                    </p>
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>

        {popped.length === balloons.length && (
          <h2
            style={{
              color: '#db2777',
              marginTop: '40px'
            }}
            className="fade-in"
          >
            Surprise unlocked ✨
          </h2>
        )}
      </div>
    </div>
  )
}

function FinalPage() {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.card} className="fade-in">
        <img
          src={soloBack}
          alt="Mom"
          className="floating"
          style={styles.finalImage}
        />

        <h1 style={styles.title}>
          Thank You For Everything Amma ❤️
        </h1>

        <p style={styles.quote}>
          No matter how old I grow,
          I will always need your love,
          your hugs and your smile.
        </p>

        <h2
          style={{
            color: '#e11d48',
            marginTop: '30px'
          }}
        >
          I Love You So Much Amma ❤️
        </h2>
      </div>
    </div>
  )
}

const styles = {
  app: {
    minHeight: '100vh',
    background:
      'linear-gradient(to bottom right, #ffe4e6, #fdf2f8, #f3e8ff)',
    fontFamily: 'Arial, sans-serif',
    overflow: 'hidden'
  },

  pageContainer: {
    minHeight: '93vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px'
  },

  card: {
    background: 'rgba(255,255,255,0.75)',
    backdropFilter: 'blur(10px)',
    borderRadius: '35px',
    padding: '40px',
    textAlign: 'center',
    maxWidth: '850px',
    width: '100%',
    boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
  },

  title: {
    fontSize: '42px',
    color: '#db2777',
    marginTop: '25px',
    marginBottom: '20px'
  },

  quote: {
    fontSize: '20px',
    color: '#4b5563',
    lineHeight: '1.8',
    marginBottom: '35px'
  },

  button: {
    background: 'linear-gradient(to right, #ec4899, #f43f5e)',
    border: 'none',
    color: 'white',
    padding: '18px 40px',
    borderRadius: '999px',
    fontSize: '22px',
    cursor: 'pointer',
    transition: '0.3s'
  },

  mainImage: {
    width: '260px',
    height: '260px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '8px solid #f9a8d4',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
  },

  finalImage: {
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '8px solid #f9a8d4',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
  },

  heartIcon: {
    position: 'absolute',
    bottom: '-10px',
    right: '-10px',
    backgroundColor: '#ec4899',
    padding: '15px',
    borderRadius: '50%'
  },

  balloonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '40px',
    marginTop: '50px'
  },

  balloon: {
    width: '120px',
    height: '150px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
  },

  string: {
    width: '2px',
    height: '60px',
    backgroundColor: '#6b7280'
  },

  memoryImage: {
    width: '180px',
    height: '180px',
    borderRadius: '25px',
    objectFit: 'cover',
    border: '4px solid white',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
  },

  memoryText: {
    marginTop: '15px',
    color: '#db2777',
    fontWeight: 'bold',
    fontSize: '18px'
  },

  photoCard: {
    background: 'rgba(255,255,255,0.7)',
    padding: '15px',
    borderRadius: '30px'
  },

  miniHeartsRow: {
    fontSize: '28px',
    marginBottom: '25px'
  }
}