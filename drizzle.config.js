/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://neondb_owner:npg_puWMdQ85PNXb@ep-lively-sky-a7mj1hca-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
    }
  };