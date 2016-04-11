/*
* CSCI3280 Introduction to Multimedia Systems
*
* --- Declaration ---
*
* I declare that the assignment here submitted is original except for source
* material explicitly acknowledged. I also acknowledge that I am aware of
* University policy and regulations on honesty in academic work, and of the
* disciplinary guidelines and procedures applicable to breaches of such policy
* and regulations, as contained in the website
* http://www.cuhk.edu.hk/policy/academichonesty/
*
* Assignment 2
* Name : Chim Wing Tat ,Deep
* Student ID :1155032378
* Email Addr :deepjimjim@gmail.com
*/



#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>
#include <ctype.h>

#define CODE_SIZE  12
#define TRUE 1
#define FALSE 0



/*****************************************************************
* variables by deep
****************************************************************/
#define max_child_node 256 
#define max_dict_val 4096  
#define USSHRT_MAX 65535

struct dictionary {
	unsigned short *node = new unsigned short[max_child_node + 3];
};
unsigned short dict_code;
dictionary *dict = new dictionary[max_dict_val - 1]; // tree matrix
unsigned short *str = new unsigned short[max_dict_val - max_child_node]; //str buffer


/* function prototypes */
unsigned int read_code(FILE*, unsigned int);
void write_code(FILE*, unsigned int, unsigned int);
void writefileheader(FILE *, char**, int);
void readfileheader(FILE *, char**, int *);
void compress(FILE *lzw_file, char **input_file_names, int file_num);
void decompress(FILE*lzw_file, char *output_file_names,int file_num);
void initDict(unsigned short flag);
unsigned short out_str(FILE* out_file, unsigned short cW,unsigned short flag);
void add_dict(FILE *outfile, unsigned short pW, unsigned short C);

int main(int argc, char **argv)
{
	int printusage = 0;
	int	no_of_file;
	char **input_file_names;
	char *output_file_names;
	FILE *lzw_file;

	if (argc >= 3)
	{
		if (strcmp(argv[1], "-c") == 0)
		{
			/* compression */
			lzw_file = fopen(argv[2], "wb");

			/* write the file header */
			input_file_names = argv + 3;
			no_of_file = argc - 3;
			writefileheader(lzw_file, input_file_names, no_of_file);

			/* my code for compress */
			initDict(0); //initailize dictionary
			compress(lzw_file, input_file_names, no_of_file);
			fclose(lzw_file);
		}
		else
			if (strcmp(argv[1], "-d") == 0)
			{
				/* decompress */
				lzw_file = fopen(argv[2], "rb");

				/* read the file header */
				no_of_file = 0;
				readfileheader(lzw_file, &output_file_names, &no_of_file);

				/* my code for decompress */
				if (no_of_file == 0) {
					puts("0 file is uncompressed");
				}
				else {
					initDict(1);
					decompress(lzw_file, output_file_names, no_of_file);
				}
				fclose(lzw_file);
				free(output_file_names);
			}
			else
				printusage = 1;
	}
	else
		printusage = 1;

	if (printusage)
		printf("Usage: %s -<c/d> <lzw filename> <list of files>\n", argv[0]);

	return 0;
}

/*****************************************************************
*
* writefileheader() -  write the lzw file header to support multiple files
*
****************************************************************/
void writefileheader(FILE *lzw_file, char** input_file_names, int no_of_files)
{
	int i;
	/* write the file header */
	for (i = 0; i < no_of_files; i++)
	{
		fprintf(lzw_file, "%s\n", input_file_names[i]);

	}
	fputc('\n', lzw_file);

}

/*****************************************************************
*
* readfileheader() - read the fileheader from the lzw file
*
****************************************************************/
void readfileheader(FILE *lzw_file, char** output_filenames, int * no_of_files)
{
	int noofchar;
	char c, lastc;

	noofchar = 0;
	lastc = 0;
	*no_of_files = 0;
	/* find where is the end of double newline */
	while ((c = fgetc(lzw_file)) != EOF)
	{
		noofchar++;
		if (c == '\n')
		{
			if (lastc == c)
				/* found double newline */
				break;
			(*no_of_files)++;
		}
		lastc = c;
	}

	if (c == EOF)
	{
		/* problem .... file may have corrupted*/
		*no_of_files = 0;
		return;

	}
	/* allocate memeory for the filenames */
	*output_filenames = (char *)malloc(sizeof(char)*noofchar);
	/* roll back to start */
	fseek(lzw_file, 0, SEEK_SET);

	fread((*output_filenames), 1, (size_t)noofchar, lzw_file);

	return;
}

/*****************************************************************
*
* read_code() - reads a specific-size code from the code file
*
****************************************************************/
unsigned int read_code(FILE *input, unsigned int code_size)
{
	unsigned int return_value;
	static int input_bit_count = 0;
	static unsigned long input_bit_buffer = 0L;

	/* The code file is treated as an input bit-stream. Each     */
	/*   character read is stored in input_bit_buffer, which     */
	/*   is 32-bit wide.                                         */

	/* input_bit_count stores the no. of bits left in the buffer */

	while (input_bit_count <= 24) {
		input_bit_buffer |= (unsigned long)getc(input) << (24 - input_bit_count);
		input_bit_count += 8;
	}

	return_value = input_bit_buffer >> (32 - code_size);
	input_bit_buffer <<= code_size;
	input_bit_count -= code_size;

	return(return_value);
}


/*****************************************************************
*
* write_code() - write a code (of specific length) to the file
*
****************************************************************/
void write_code(FILE *output, unsigned int code, unsigned int code_size)
{
	static int output_bit_count = 0;
	static unsigned long output_bit_buffer = 0L;

	/* Each output code is first stored in output_bit_buffer,    */
	/*   which is 32-bit wide. Content in output_bit_buffer is   */
	/*   written to the output file in bytes.                    */

	/* output_bit_count stores the no. of bits left              */

	output_bit_buffer |= (unsigned long)code << (32 - code_size - output_bit_count);
	output_bit_count += code_size;

	while (output_bit_count >= 8) {
		putc(output_bit_buffer >> 24, output);
		output_bit_buffer <<= 8;
		output_bit_count -= 8;
	}


	/* only < 8 bits left in the buffer                          */

}

/*****************************************************************
*
* initDict() - initialize the dictionary
*
****************************************************************/
void initDict(unsigned short flag)
{
	int i, j, k;
	dict_code = max_child_node;

	if (flag == 0) { // dict for compression
		for (i = 0; i <= max_dict_val - 2; i++) {
			for (j = 0; j <=max_child_node; j++) {
				dict[i].node[j] = USSHRT_MAX;
			}		
		}
	}
	else { // dict for decompression
		for (i = 0; i <= max_dict_val - 2; i++) {
			for (j = 0; j <= max_child_node+1; j++) {
				dict[i].node[j] = USSHRT_MAX;
			}
		}
	}	
	//printf("%d,%d\n", i, j); //debug
}

/*****************************************************************
*
* compress() - compress the source file and output the coded text
*
****************************************************************/
void compress(FILE *lzw_file, char **input_file_names, int file_num)
{
	int i;
	unsigned short C;
	unsigned char code;
	FILE *in_file;
	
	for (i = 0; i < file_num; i++) {
	
		in_file = fopen(input_file_names[i], "rb");
	//	printf("%s\n", input_file_names[i]);
		C = fread(&code, 1, 1, in_file);

		if (C == 0) { //enpty file
		
			write_code(lzw_file, max_dict_val - 1, CODE_SIZE);
		}
		else {
			C = code; // C:= [0 , 255]
		}

		while (fread(&code, 1, 1, in_file) > 0) { // compression

			if (dict[C].node[code] == USSHRT_MAX) { //dict not found
				write_code(lzw_file, C, CODE_SIZE);
	
				if (dict_code == max_dict_val - 1) {//dict is full
					initDict(0);
				}
				else {
					dict[C].node[code] = dict_code;//new entry to dict
					dict_code++;
				}
				C = code; //P:=C
			}
			else {//dict found
				C = dict[C].node[code]; //append C to P
			}
		}
		
		write_code(lzw_file, C, CODE_SIZE); //last code of C
		write_code(lzw_file, max_dict_val - 1, CODE_SIZE); // EOF
		fclose(in_file);

	}
	write_code(lzw_file, 0, CODE_SIZE); //flush 

}

/*****************************************************************
*
* decompress() - decompress a compressed file to the orig. file
*
****************************************************************/
void decompress(FILE*lzw_file, char *output_file_names, int file_num)
{
	char *file_name;
	FILE *outfile;
	unsigned short pW, cW, i;
	unsigned short C;
	
	file_name = strtok(output_file_names, "\n"); //get file names 1 by 1
	while (file_name != NULL) {
		file_num--;
		if (file_num == -1) return;
		outfile = fopen(file_name, "wb");
		//printf("%s\n", file_name);
		cW = read_code(lzw_file, CODE_SIZE);
		
		if (cW == max_dict_val - 1) { // empty file
			goto empty;
		}
		else {
			if (cW < max_child_node) { //cW = [0,255]
				fwrite(&cW, 1, 1, outfile); // output it
			}
			else {				//cW >255
				out_str(outfile, cW, 0);
			}	
		}
		while (cW != max_dict_val - 1) { //decompression
			pW = cW;
			cW = read_code(lzw_file, CODE_SIZE); //read from compressed file
		
			if (cW == max_dict_val - 1) goto empty; // EOF

			if (cW < max_child_node || dict[cW].node[max_child_node] != USSHRT_MAX) {//code is found on dict
				C = out_str(outfile, cW, 0); //output string
				add_dict(outfile, pW, C); //add new string to dictionary
			}
			else { //unfound
				C = out_str(outfile, pW, 1);
				add_dict(outfile, pW, C);
			}
		}
		empty:
		fclose(outfile);
		file_name = strtok(NULL, "\n"); //next file
	}
}

/*****************************************************************
* output the string dictionary cW
****************************************************************/
unsigned short out_str(FILE *outfile,unsigned short cW,unsigned short flag) {
	
	unsigned short  pW;
	unsigned short C;
	long str_ptr;

	if (cW < max_child_node) { // cW:= [0,255] 
		fwrite(&cW, 1, 1, outfile);
		C = cW;
	}
	else { // cW >255 and it is a str
		str_ptr = 0;
		while (dict[cW].node[max_child_node] != USSHRT_MAX) {
			pW = dict[cW].node[max_child_node];
			str[str_ptr] = dict[cW].node[max_child_node + 1];
			str_ptr++;
			cW = pW;
		}
		str[str_ptr] = cW;
		C = cW; // first char	
		while (str_ptr >= 0) { // output the string
			fwrite(&str[str_ptr], 1, 1, outfile);
			str_ptr--;
		}	
	}
	if (flag == 1) { // exception case, C = first char of pW
		fwrite(&C, 1, 1, outfile);
	}
	return C;
}
/*****************************************************************
* add the string <P,C> to dictionary
****************************************************************/
void add_dict(FILE *outfile, unsigned short pW, unsigned short C) {
	if (dict_code == max_dict_val - 1) { // dict is full
		initDict(1);
	}
	else {
		dict[dict_code].node[max_child_node + 1] = C; //edge value 
		dict[dict_code].node[max_child_node] = pW; //previous node
		dict_code++;
	}
}


