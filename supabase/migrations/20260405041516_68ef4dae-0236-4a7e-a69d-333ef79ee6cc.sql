-- Allow authenticated users to read ALL landing pages (including inactive) for admin
CREATE POLICY "Authenticated users can view all landing pages"
ON public.landing_pages
FOR SELECT
TO authenticated
USING (true);

-- Restrict inserts and updates to authenticated users only
DROP POLICY IF EXISTS "Allow all inserts on landing pages" ON public.landing_pages;
DROP POLICY IF EXISTS "Allow all updates on landing pages" ON public.landing_pages;

CREATE POLICY "Authenticated users can insert landing pages"
ON public.landing_pages
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update landing pages"
ON public.landing_pages
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Allow authenticated users to delete landing pages
CREATE POLICY "Authenticated users can delete landing pages"
ON public.landing_pages
FOR DELETE
TO authenticated
USING (true);