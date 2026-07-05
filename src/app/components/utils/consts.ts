export const COLORS = {
    gold: "#C9A84C",
    goldLight: "#E8D49A",
    goldPale: "#F7F0DC",
    deep: "#1A0F00",
    cream: "#FAF6ED",
    text: "#2C1A00",
    muted: "#7A6040",
  };

export const styles = {
    eyebrow: {
      fontSize: "0.7rem",
      letterSpacing: "0.25em",
      textTransform: "uppercase",
      color: COLORS.gold,
      marginBottom: "0.75rem",
      fontWeight: 500,
      fontFamily: "'DM Sans', system-ui, sans-serif",
    },
    sectionTitle: {
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      fontSize: "clamp(2.2rem,5vw,3.2rem)",
      fontWeight: 300,
      color: COLORS.deep,
      lineHeight: 1.1,
      fontStyle: "italic",
      marginBottom: "2rem",
    },
    goldRule: {
      width: 60,
      height: 2,
      background: COLORS.gold,
      margin: "0 auto 3rem",
    },
  };

  export const ACCOUNTS = [
    {
      person: "Bride",
      name: "Nduneri Chinwendu Joy",
      emoji: "👰🏾",
      accounts: [
        { bank: "First Bank", number: "3130958814", type: "Naira" },
      ],
    },
    {
      person: "Groom",
      name: "Aitonje Eguakhide",
      emoji: "🤵🏾",
      accounts: [
        { bank: "Zenith Bank", number: "2283608861", type: "Naira" },
      ],
    },
  ];