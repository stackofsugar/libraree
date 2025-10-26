module LoggingHelper
  def greenlog(msg)
    logger.debug { "\x1b[37;42;1m#{msg}\x1b[0m" }
  end
  def redlog(msg)
    logger.debug { "\x1b[37;41;1m#{msg}\x1b[0m" }
  end
end
