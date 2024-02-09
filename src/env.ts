class Env {
  static S3_BUCKET: string = process.env.NEXT_PUBLIC_BUCKET!;
  static SUPABASE_URL: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
}

export default Env;
