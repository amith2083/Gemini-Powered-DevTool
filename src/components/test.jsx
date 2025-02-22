useEffect(() => {
    if (!user) return;
  
    const initializeChat = async () => {
      try {
        // pointing to the entire "messages" folder in your database. It doesn't pick any specific messages yet
        const messagesRef = collection(db, "messages");
  
        // 🟢 Firestore Transaction ensures no duplicate welcome messages
        await runTransaction(db, async (transaction) => {
          // 🔍 Query Firestore to check if a welcome message already exists
          const userMessagesQuery = query(
            messagesRef,
            where("userId", "==", user.uid),
            where("isWelcomeMessage", "==", true)
          );
          const existingWelcomeSnapshot = await getDocs(userMessagesQuery);
  
          // If no welcome message exists, create one
          if (existingWelcomeSnapshot.empty) {
            const newMessageRef = doc(messagesRef); // Generate a new document reference
            transaction.set(newMessageRef, {
              text: `Hello there! I'm here to help you with your programming questions. Feel free to ask me anything related to programming, and I'll do my best to assist you.`,
              timestamp: serverTimestamp(),
              role: "ai",
              userId: user.uid,
              isWelcomeMessage: true, // Prevents duplicates
            });
          }
        }); //  runTransaction automatically commits here
  
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };
  
    initializeChat();
  
    // 🟢 Live listener for user message
    //Look in the messages collection of the database,
//Find only the messages that belong to the current user (using their ID)
//Sort these messages by the time they were sent (from oldest to newest)s
    const q = query(
      collection(db, "messages"),
      where("userId", "==", user.uid),
      orderBy("timestamp", "asc")
    );
  
    const unsubscribe = onSnapshot(q, {
      next: (snapshot) => {
        const messageData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageData);
        setIndexReady(true);
      },
      error: (error) => {
        console.error("Error fetching messages:", error);
        setIndexReady(true);
      },
    });
  
    return () => unsubscribe(); //  Cleanup listener 
  }, [user?.uid]); //  Only re-run when `user.uid` changes
