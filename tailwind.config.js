/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,html}'
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--bg-primary)'
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          dim: 'var(--text-dim)'
        },
        accent: {
          DEFAULT: 'var(--accent)',
          light: 'var(--accent-light)',
          dim: 'var(--accent-dim)'
        },
        semantic: {
          success: 'var(--success)',
          danger: 'var(--danger)'
        },
        border: {
          subtle: 'var(--border-subtle)',
          accent: 'var(--border-accent)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      letterSpacing: {
        'tight-display': '-0.04em',
        'tight-title': '-0.025em',
        'kicker': '0.18em'
      },
      fontSize: {
        'kicker': ['11px', { lineHeight: '1.2', letterSpacing: '0.18em' }]
      }
    }
  },
  plugins: []
};
