-- FTTH-NETMAP initial schema
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  username VARCHAR(64) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  roles TEXT[] DEFAULT ARRAY['Planner'],
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS map_nodes (
  id UUID PRIMARY KEY,
  name VARCHAR(120),
  type VARCHAR(32),
  lat DECIMAL(10,8),
  lng DECIMAL(11,8),
  properties JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cables (
  id UUID PRIMARY KEY,
  code VARCHAR(64) UNIQUE NOT NULL,
  type VARCHAR(32) NOT NULL,
  length NUMERIC,
  capacity_buffers INTEGER,
  capacity_fibers INTEGER,
  color_pattern JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS splice_boxes (
  id UUID PRIMARY KEY,
  code VARCHAR(64) UNIQUE NOT NULL,
  location UUID REFERENCES map_nodes(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS splices (
  id UUID PRIMARY KEY,
  name VARCHAR(120),
  cable_id UUID REFERENCES cables(id),
  splitter_levels JSONB,
  fibers JSONB,
  autosave_seconds INTEGER DEFAULT 15,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pon_ports (
  id UUID PRIMARY KEY,
  olt VARCHAR(64),
  slot VARCHAR(32),
  port VARCHAR(32),
  cable_id UUID REFERENCES cables(id),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS onus (
  id UUID PRIMARY KEY,
  serial VARCHAR(64) UNIQUE,
  loid VARCHAR(64),
  address VARCHAR(256),
  coordinates GEOGRAPHY(POINT, 4326),
  port_id UUID REFERENCES pon_ports(id),
  created_at TIMESTAMP DEFAULT NOW()
);
