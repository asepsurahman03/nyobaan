<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{    
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        // get posts
        $posts = Post::latest()->paginate(5);

        // render view with posts
        return view('posts.index', compact('posts'));
    }
    
    /**
     * create
     *
     * @return void
     */
    public function create()
    {
        return view('posts.create');
    }

    /**
     * store
     *
     * @param Request $request
     * @return void
     */
    public function store(Request $request)
    {
        // validate form
        $request->validate([
            'image'   => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'namaApk' => 'required',
            'versi'   => 'required',
            'tahun'   => 'required'
        ]);

        // upload image
        $image = $request->file('image');
        $imagePath = $image->storeAs('public/posts', $image->hashName());

        // create post
        Post::create([
            'image'   => $imagePath,
            'namaApk' => $request->namaApk,
            'versi'   => $request->versi,
            'tahun'   => $request->tahun
        ]);

        // redirect to index
        return redirect()->route('posts.index')->with('success', 'Data Berhasil Disimpan!');
    }
}
