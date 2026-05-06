CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS meeting_title_trgm_gin_idx
  ON "meeting" USING gin (title gin_trgm_ops);

CREATE INDEX IF NOT EXISTS transcript_segment_text_trgm_gin_idx
  ON "transcript_segment" USING gin (text gin_trgm_ops);

DO $$
BEGIN
  IF (SELECT COUNT(*) FROM "meeting_chunk") > 1000 THEN
    CREATE INDEX IF NOT EXISTS meeting_chunk_embedding_ivfflat_idx
      ON "meeting_chunk" USING ivfflat (embedding vector_cosine_ops)
      WITH (lists = 100);
  END IF;
END
$$;
